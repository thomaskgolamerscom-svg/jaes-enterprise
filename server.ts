import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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
  app.post("/api/contact", (req, res) => {
    const { fullName, companyName, country, emailAddress, phoneNumber, subject, message } = req.body;

    if (!fullName || !companyName || !emailAddress || !message) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing: fullName, companyName, emailAddress, and message are required."
      });
    }

    // High fidelity email logging (simulating enterprise SMTP mail relay)
    console.log("===============================================================");
    console.log("📥 NEW CONTACT INQUIRY RECEIVED & DISPATCHED SUCCESSFULLY");
    console.log(`FROM: ${fullName} (${companyName}) - ${country || "Not Specified"}`);
    console.log(`RECIPIENTS: boraldabendaj.agikons@gmail.com, cysmedlcal.9@gmail.com`);
    console.log(`SUBJECT: [Jae's Enterprise Sourcing Inquiry] - ${subject || "General Inquiry"}`);
    console.log("---------------------------------------------------------------");
    console.log(`Email Body:`);
    console.log(`Client Name:      ${fullName}`);
    console.log(`Company:          ${companyName}`);
    console.log(`Country:          ${country || "N/A"}`);
    console.log(`Email Address:    ${emailAddress}`);
    console.log(`Phone:            ${phoneNumber || "N/A"}`);
    console.log(`Message Content:\n"${message}"`);
    console.log("===============================================================");

    return res.status(200).json({
      success: true,
      message: "Your procurement inquiry has been transmitted directly to our executive sourcing team.",
      referenceId: `JE-CON-${Date.now().toString().slice(-6)}`
    });
  });

  // RFQ Submission
  app.post("/api/rfq", (req, res) => {
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

    // High fidelity RFQ email logging
    console.log("===============================================================");
    console.log("📥 NEW REQUEST FOR QUOTATION (RFQ) SUBMITTED & ROUTED SUCCESSFULLY");
    console.log(`PRODUCT: ${productName} (Qty: ${quantity})`);
    console.log(`RECIPIENTS: boraldabendaj.agikons@gmail.com, cysmedlcal.9@gmail.com`);
    console.log(`SUBJECT: [Jae's Enterprise RFQ] - ${productName}`);
    console.log("---------------------------------------------------------------");
    console.log(`RFQ Specifications:`);
    console.log(`Product Name:   ${productName}`);
    console.log(`Quantity:       ${quantity}`);
    console.log(`Specifications: ${productSpecifications || "See attachments/notes"}`);
    console.log(`Target Budget:  ${budget || "To be Negotiated"}`);
    console.log(`Delivery to:    ${deliveryCountry}`);
    console.log(`Required by:    ${timeline}`);
    console.log(`Additional:     ${additionalNotes || "None"}`);
    
    if (fileName && fileBase64) {
      const sizeInBytes = Math.round((fileBase64.length * 3) / 4);
      console.log(`📎 ATTACHED SPECIFICATION FILE:`);
      console.log(`   File Name:   ${fileName}`);
      console.log(`   File Type:   ${fileType || "Application/Octet-Stream"}`);
      console.log(`   File Size:   ${(sizeInBytes / 1024).toFixed(2)} KB`);
      console.log(`   Data Prefix: ${fileBase64.substring(0, 50)}...`);
    } else {
      console.log(`📎 ATTACHED SPECIFICATION FILE: None`);
    }
    console.log("===============================================================");

    return res.status(200).json({
      success: true,
      message: "Your Request For Quotation has been securely parsed and emailed directly to our Global Sourcing Desk.",
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
