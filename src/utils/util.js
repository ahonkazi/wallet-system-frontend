import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const isNumeric = (nmbr) => {
    return !isNaN(nmbr);
}
export const range = (start, end) => {
    let array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}

export const generatePDFWithHTML = async (htmlElement, name) => {
    try {
        const doc = new jsPDF();
        const element = document.createElement('div');
        element.innerHTML = htmlElement;

        console.log("Element created:", element);  // Add logging for debugging

        // Delay slightly for DOM readiness (adjust as needed):
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(element);
        console.log("Canvas created:", canvas);  // Add logging for debugging
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, 'PNG', 10, 10, 150, 100);
        doc.save(name);
    } catch (error) {
        console.error("Error generating PDF:", error);  // Log errors for debugging
    }
};

const convertToPdf = () => {
    const content = `<p>Hello world</p>`;
    generatePDFWithHTML(content, 'passport.pdf')
};
