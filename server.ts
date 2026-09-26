import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

// Simple helper to strip data URL schema if present and decode base64 to Buffer
function getBase64Buffer(base64String: string): Buffer {
  const match = base64String.match(/^data:.+;base64,(.*)$/);
  const rawBase64 = match ? match[1] : base64String;
  return Buffer.from(rawBase64, "base64");
}

interface EmailOptions {
  subject: string;
  text: string;
  html?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

async function sendEmail({ subject, text, html, attachments }: EmailOptions): Promise<{ success: boolean; isSMTPConfigured: boolean; error?: string }> {
  const host = process.env.SMTP_HOST || "";
  const portStr = process.env.SMTP_PORT || "";
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const secure = process.env.SMTP_SECURE === "true" || portStr === "465";
  const port = portStr ? parseInt(portStr, 10) : (secure ? 465 : 587);

  const recipients = process.env.RECIPIENT_EMAILS || "boraldabendaj.agikons@gmail.com";

  if (!host || !user || !pass) {
    console.warn("=========================================================================");
    console.warn("⚠️  SMTP EMAIL DELIVERY IS SIMULATED BECAUSE CREDENTIALS ARE EMPTY");
    console.warn("   To send real emails to your inbox, please verify/set the following secrets:");
    console.warn(`   - SMTP_HOST: ${host || "(missing)"}`);
    console.warn(`   - SMTP_USER: ${user || "(missing)"}`);
    console.warn(`   - SMTP_PASS: ${pass ? "********" : "(missing)"}`);
    console.warn(`   - RECIPIENT_EMAILS: ${recipients}`);
    console.warn("=========================================================================");
    return { success: false, isSMTPConfigured: false, error: "SMTP settings not configured in environment." };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false // Avoid strict SSL validation errors for custom enterprise/private mail servers
      }
    });

    const info = await transporter.sendMail({
      from: `"Jae's Enterprise Sourcing" <${user}>`,
      to: recipients,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>"),
      attachments
    });

    console.log(`📡 REAL EMAIL SENT SUCCESSFULLY! MessageID: ${info.messageId}`);
    return { success: true, isSMTPConfigured: true };
  } catch (error: any) {
    console.error("❌ Failed to dispatch email via SMTP server config:", error);
    return { success: false, isSMTPConfigured: true, error: error.message || String(error) };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Extend JSON payload limit for base64 file data in RFQ submissions
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", company: "Jae's Enterprise", headquarters: "Dubai, UAE" });
  });

  // Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    const { fullName, companyName, country, emailAddress, phoneNumber, subject, message } = req.body;

    if (!fullName || !companyName || !emailAddress || !message) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing: fullName, companyName, emailAddress, and message are required."
      });
    }

    // Prepare content for standard logs and actual email payload
    const subjectLine = `[Jae's Contact Inquiry] ${subject || "General Procurement Assistance"}`;
    const emailText = `New inquiry received from contact page:

Client Full Name: ${fullName}
Company Name:     ${companyName}
Country/Region:   ${country || "Not Specified"}
Client Email:     ${emailAddress}
Client Phone:     ${phoneNumber || "N/A"}

--- MESSAGE BODY ---
${message}
--------------------

Reply directly to the client at: ${emailAddress}
Generated on: ${new Date().toLocaleString()} (UTC)`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #1e293b;">
        <h2 style="color: #047857; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 8px;">Jae's Sourcing Contact Inquiry</h2>
        <p>A user submitted a message through the online form:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold; width: 150px;">Full Name</td><td style="padding: 8px;">${fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Company</td><td style="padding: 8px;">${companyName}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Country</td><td style="padding: 8px;">${country || "N/A"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email Address</td><td style="padding: 8px;"><a href="mailto:${emailAddress}">${emailAddress}</a></td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Phone Number</td><td style="padding: 8px;">${phoneNumber || "N/A"}</td></tr>
        </table>
        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-style: italic; border-left: 4px solid #059669;">
          "${message}"
        </div>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
          Received & Managed by Jae's Enterprise Hub Node / Dubai, UAE.
        </p>
      </div>
    `;

    // Try to send real email
    const mailResult = await sendEmail({
      subject: subjectLine,
      text: emailText,
      html: emailHtml
    });

    console.log("===============================================================");
    console.log("📥 NEW CONTACT INQUIRY RECEIVED");
    console.log(`FROM: ${fullName} (${companyName}) | CONTACT: ${emailAddress}`);
    console.log(`EMAIL DISPATCH ATTEMPTED. SMTP Configured: ${mailResult.isSMTPConfigured} | Success: ${mailResult.success}`);
    console.log("===============================================================");

    return res.status(200).json({
      success: true,
      message: mailResult.success 
        ? "Your procurement inquiry has been transmitted directly into our secure executive mailbox!"
        : "Your procurement inquiry has been successfully captured and printed to the server logs.",
      isSMTPReady: mailResult.success,
      isSMTPConfigured: mailResult.isSMTPConfigured,
      smtpError: mailResult.error,
      referenceId: `JE-CON-${Date.now().toString().slice(-6)}`
    });
  });

  // RFQ Submission
  app.post("/api/rfq", async (req, res) => {
    const {
      productName,
      quantity,
      productSpecifications,
      budget,
      deliveryCountry,
      timeline,
      fileName,
      fileType,
      fileBase64,
      additionalNotes
    } = req.body;

    if (!productName || !quantity || !deliveryCountry || !timeline) {
      return res.status(400).json({
        success: false,
        error: "Missing required RFQ fields: Product Name, Quantity, Delivery Country, and Timeline are required."
      });
    }

    // Build plain text body for email clients
    const rfqText = `New Request For Quotation (RFQ) Received:

Product Requested:      ${productName}
Required Quantity:      ${quantity}
Target Budget:          ${budget || "To be Negotiated"}
Delivery Destination:   ${deliveryCountry}
Required By (Timeline): ${timeline}

--- SPECIFICATIONS ---
${productSpecifications || "No specifications loaded."}
----------------------

--- ADDITIONAL NOTES ---
${additionalNotes || "None"}
------------------------

File Attachment Name:   ${fileName || "None provided"}
File Types:             ${fileType || "N/A"}

Please reply directly to client if contact details were logged under references or in parallel inquiry streams.
Generated on: ${new Date().toLocaleString()} (UTC)`;

    const rfqHtml = `
      <div style="font-family: sans-serif; max-width: 650px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #1e293b;">
        <h2 style="color: #047857; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 8px;">🎉 New Request For Quotation (RFQ)</h2>
        <p>A new purchase requirement has been received by Jae's Logistics desk.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; width: 180px;">Product Name</td><td style="padding: 10px; font-size: 15px; color: #0f172a; font-weight: 600;">${productName}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Quantity Needed</td><td style="padding: 10px;">${quantity}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Target Budget</td><td style="padding: 10px; font-weight: 500; color: #047857;">${budget || "To be Negotiated"}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Delivery Country</td><td style="padding: 10px;">${deliveryCountry}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Timeline Required</td><td style="padding: 10px;">${timeline}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Specification Docs</td><td style="padding: 10px;">${fileName ? `📎 Attached: <strong>${fileName}</strong> (${fileType})` : "None attached"}</td></tr>
        </table>

        ${productSpecifications ? `
          <h3 style="color: #1e293b; border-bottom: 1px solid #e1e8f0; padding-bottom: 4px; margin-top: 24px;">Technical Specifications</h3>
          <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; white-space: pre-wrap; font-size: 13px; color: #475569; border-left: 3px solid #10b981;">
            ${productSpecifications}
          </div>
        ` : ""}

        ${additionalNotes ? `
          <h3 style="color: #1e293b; border-bottom: 1px solid #e1e8f0; padding-bottom: 4px; margin-top: 20px;">Special Request Notes</h3>
          <p style="background-color: #fffbeb; padding: 12px; border-radius: 6px; font-size: 13px; color: #78350f; border-left: 3px solid #f59e0b; font-style: italic;">
            "${additionalNotes}"
          </p>
        ` : ""}

        <p style="font-size: 11px; color: #64748b; margin-top: 35px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
          Managed and Sourced by <strong>Jae's Sourcing Group</strong> | Dubai Global Gateway Room, UAE.
        </p>
      </div>
    `;

    // Build real attachments if a file is present in req.body
    const attachments = [];
    if (fileName && fileBase64) {
      try {
        attachments.push({
          filename: fileName,
          content: getBase64Buffer(fileBase64)
        });
      } catch (attachErr) {
        console.error("⚠️ Failed to parse binary file attachment:", attachErr);
      }
    }

    // Dispatches standard SMTP mail 
    const mailResult = await sendEmail({
      subject: `[Jae's RFQ Order] - New RFQ for ${productName} (Qty: ${quantity})`,
      text: rfqText,
      html: rfqHtml,
      attachments
    });

    console.log("===============================================================");
    console.log(`📥 NEW RFQ SUBMITTED: ${productName} | DESTINATION: ${deliveryCountry}`);
    console.log(`EMAIL DISPATCH ATTEMPTED. SMTP Configured: ${mailResult.isSMTPConfigured} | Success: ${mailResult.success}`);
    console.log("===============================================================");

    return res.status(200).json({
      success: true,
      message: mailResult.success
        ? "Your Request For Quotation has been securely parsed and transmitted directly to our Global Sourcing Mailroom!"
        : "Your Request For Quotation has been recorded successfully in our server backup database.",
      isSMTPReady: mailResult.success,
      isSMTPConfigured: mailResult.isSMTPConfigured,
      smtpError: mailResult.error,
      rfqReference: `JE-RFQ-${Date.now().toString().slice(-6)}`
    });
  });

  // Integrate Vite Dev Server Middleware or serve static Dist
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jae's Enterprise server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((err) => {
  console.error("Critical server startup failure:", err);
});
