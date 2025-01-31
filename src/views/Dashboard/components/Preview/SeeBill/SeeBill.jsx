import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./SeeBill.module.css";
import HeaderCard from "../../HeaderCard/HeaderCard";
import FacturaTemplate from "../../FacturaTemplate/FacturaTemplate";
// import documentoPDF from "../../../assets/pdfs/document.pdf";
let documentoPDF;

try {
  documentoPDF = require("../../../assets/pdfs/document.pdf");
} catch (error) {
  console.warn("El archivo document.pdf no existe:", error.message);
  documentoPDF = null; // Valor por defecto si no existe el archivo
}

const SeeBill = forwardRef(({ document, setSeeBill }, ref) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const contentRef = useRef();

  const handleGeneratePDF = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);

    const pdfBlob = pdf.output("blob");
    const formData = new FormData();
    formData.append(
      "file",
      new File([pdfBlob], "document.pdf", { type: "application/pdf" })
    );

    const response = await fetch("http://localhost:3006/api/user/upload-pdf", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setPdfUrl(true);
    } else {
      alert("Error al guardar el archivo PDF.");
    }
  };

  // Exponer la función al componente padre
  useImperativeHandle(ref, () => ({
    generatePDF: handleGeneratePDF,
  }));

  return (
    <div className={styles.seeBillContainer}>
      <div className={styles.bg} onClick={() => setSeeBill(false)}></div>
      <div className={styles.seeBillContent}>
        <HeaderCard title={""} setState={setSeeBill} />

        <div className={styles.none}>
          <FacturaTemplate ref={contentRef} document={document} />
        </div>

        {/* <button
          onClick={handleGeneratePDF}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Crear PDF y Guardar en el Servidor
        </button> */}

        {pdfUrl ? (
          <div className={styles.pdf}>
            {!documentoPDF && "No existe ninguna factura"}
            <embed
              src={`${documentoPDF}#zoom=50`}
              width="100%"
              height="100%"
              type="application/pdf"
            />
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
});

export default SeeBill;
