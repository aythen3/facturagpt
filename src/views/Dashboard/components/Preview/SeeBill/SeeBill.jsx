import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./SeeBill.module.css";
import HeaderCard from "../../HeaderCard/HeaderCard";
import FacturaTemplate from "../../FacturaTemplate/FacturaTemplate";

let documentoPDF;

try {
  documentoPDF = require("../../../assets/pdfs/document.pdf");
} catch (error) {
  console.warn("El archivo document.pdf no existe:", error.message);
  documentoPDF = null;
}

const SeeBill = forwardRef(({ document, setSeeBill, fileUser }, ref) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const contentRef = useRef(null); // Aquí inicializamos el ref
  const [hasGeneratedPDF, setHasGeneratedPDF] = useState(false); // Nueva bandera

  console.log(
    "API_URL_LOCAL:",
    process.env.REACT_APP_API_CREATE_PDF ||
      "https://facturagpt.com/api/user/upload-pdf"
  );

  // Manejar la carga de un archivo PDF
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setUploadedPdf(url);
    } else {
      alert("Por favor, seleccione un archivo PDF válido.");
    }
  };

  // Subir el archivo PDF al servidor
  const uploadPDF = async (pdfBlob) => {
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
      console.log("PDF subido exitosamente");
    } else {
      alert("Error al guardar el archivo PDF.");
    }
  };

  // Generar PDF
  const handleGeneratePDF = async () => {
    if (hasGeneratedPDF) return;

    setHasGeneratedPDF(true); // Marcamos que se generó el PDF

    if (fileUser) {
      console.log("AAAAAAAAAAAAAA");
      // Si hay un archivo PDF subido, simplemente usalo
      const fileUrl = URL.createObjectURL(fileUser);
      setPdfUrl(fileUrl);
      uploadPDF(fileUser); // Aquí llamamos a la función para subir el archivo PDF
      return;
    }

    if (uploadedPdf) {
      console.log("BBBBBBBBBBBBBBBBBBBBB");
      // Si se ha cargado un PDF, simplemente úsalo
      setPdfUrl(uploadedPdf);
      return;
    }

    // Si no hay un PDF cargado, genera uno desde FacturaTemplate
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
    setPdfUrl(URL.createObjectURL(pdfBlob)); // Aquí se actualiza la URL del PDF generado

    // Llamamos a la función para subir el archivo PDF generado
    uploadPDF(pdfBlob);
  };

  // Exponer la función al componente padre
  useImperativeHandle(ref, () => ({
    generatePDF: handleGeneratePDF,
  }));
  // Ejecutar handleGeneratePDF cuando el componente se monta
  useEffect(() => {
    // Ejecutar handleGeneratePDF solo una vez
    if (!hasGeneratedPDF) {
      handleGeneratePDF();
    }
  }, [hasGeneratedPDF]); // Usar hasGeneratedPDF como dependencia para evitar bucles

  return (
    <div className={styles.seeBillContainer}>
      <div className={styles.bg} onClick={() => setSeeBill(false)}></div>
      <div className={styles.seeBillContent}>
        {/* <HeaderCard title={""} setState={setSeeBill} /> */}

        {!fileUser && (
          <div className={styles.none}>
            {/* Aquí pasamos contentRef a FacturaTemplate */}
            <FacturaTemplate ref={contentRef} document={document} />
          </div>
        )}

        {pdfUrl ? (
          <div className={styles.pdf}>
            <embed
              src={`${pdfUrl}#zoom=50`}
              width="100%"
              height="100%"
              type="application/pdf"
            />
          </div>
        ) : (
          "Loading..."
        )}

        {/* <div className={styles.generateButton}>
          <button onClick={handleGeneratePDF}>Generar PDF</button>
        </div> */}
      </div>
    </div>
  );
});

export default SeeBill;
