const path = require('path');
const fs = require('fs')
const { PDFDocument } = require("pdf-lib");
const { fromPath } = require('pdf2pic');


const calculateTaxesAndDiscounts = (products) => {
    return products.map((product) => {
        let {
            productQuantity,
            productPartial,
            productDiscountRate,
            productImport,
        } = product;

        productQuantity = Number(productQuantity) || 0;
        productPartial = Number(productPartial) || 0;
        productDiscountRate = Number(productDiscountRate) || 0;
        productImport = Number(productImport) || 0;

        const productImportWithoutDiscount = parseFloat(
            (productQuantity * productPartial).toFixed(2)
        );
        const productDiscountAmount = parseFloat(
            (
                productImportWithoutDiscount -
                (productImportWithoutDiscount -
                    (productImportWithoutDiscount * productDiscountRate) / 100)
            ).toFixed(2)
        );
        const productImportWithTaxes = parseFloat(
            (productImport * 1.21).toFixed(2)
        );

        return {
            ...product,
            productImportWithoutDiscount: productImportWithoutDiscount.toFixed(2),
            productDiscountAmount: productDiscountAmount.toFixed(2),
            productImportWithTaxes: productImportWithTaxes.toFixed(2),
            productDiscountRate: productDiscountRate.toFixed(2),
        };
    });
};

const convertToNumber = (input) => {
    const number = parseFloat(input);

    if (isNaN(number)) {
        return 0;
    }

    return parseFloat(number.toFixed(2));
};

const mergeResults = (resultsArray) => {
    // console.log("resultsArray from mergeResults", resultsArray);
    const mergedResult = {};

    resultsArray.forEach((result) => {
        for (const key in result) {
            if (Array.isArray(result[key])) {
                mergedResult[key] = mergedResult[key] || [];
                mergedResult[key] = [...mergedResult[key], ...result[key]];
                mergedResult[key] = removeDuplicatesFromArray(mergedResult[key]);
            } else if (typeof result[key] === "object" && result[key] !== null) {
                mergedResult[key] = mergedResult[key] || {};
                mergedResult[key] = { ...mergedResult[key], ...result[key] };
            } else {
                if (!mergedResult[key]) {
                    mergedResult[key] = result[key];
                }
            }
        }
    });

    return mergedResult;
};

const removeDuplicatesFromArray = (array) => {
    const seen = new Set();
    return array.filter((item) => {
        const serializedItem = JSON.stringify(item);
        return seen.has(serializedItem) ? false : seen.add(serializedItem);
    });
};

const convertPDFToPNG = async (buffer) => {

    const tempDir = path.join(__dirname, "./temp");
    const tempPdfPath = path.join(tempDir, "temp.pdf");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    await fs.promises.writeFile(tempPdfPath, buffer);

    const pdfDoc = await PDFDocument.load(buffer);
    const totalPages = pdfDoc.getPageCount();

    const pdf2pic = fromPath(tempPdfPath, {
        density: 600,
        saveFilename: "temp",
        savePath: tempDir,
        format: "png",
        width: 1536,
        height: 2048,
    });

    const imageBuffers = [];

    for (let page = 1; page <= totalPages; page++) {
        try {
            const pageResult = await pdf2pic(page, { responseType: "image" });

            if (pageResult && pageResult.path) {
                const pngBuffer = await fs.promises.readFile(pageResult.path);
                imageBuffers.push(pngBuffer);

                await fs.promises.unlink(pageResult.path);
            } else {
                console.warn(`Failed to convert page ${page} to PNG`);
            }
        } catch (error) {
            console.error(`Error converting page ${page} to PNG:`, error);
        }
    }

    await fs.promises.unlink(tempPdfPath);

    return imageBuffers;
};

const replaceNotFoundWithEmptyString = (obj) => {
    for (const key in obj) {
        if (obj[key] === "NOT FOUND" || obj[key] === "notfound") {
            obj[key] = ""; // Cambia "NOT FOUND" por un string vacío
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = replaceNotFoundWithEmptyString(obj[key]);
        }
    }
    return obj;
};

const extractCIF = (inputString) => {
    if (!inputString) return "";

    const sanitizedString = inputString.replace(/[\s-]/g, "");

    const cifMatch = sanitizedString.match(/(?:ES)?([A-Z])(\d{8})/i);

    if (!cifMatch) {
        return inputString;
    }

    const [, letter, numbers] = cifMatch;

    return `${letter.toUpperCase()}${numbers}`;
};

const extractNIF = (inputString) => {
    const numbersMatch = inputString?.match(/\d{8}/);
    if (!numbersMatch) return inputString;

    const numbers = numbersMatch[0];
    const regex = /[A-Z]/;
    const after = inputString.slice(numbersMatch.index + 8).match(regex);

    return after ? `${numbers}${after[0]}` : inputString;
};



const extractCodeBlocks = (fullCode) => {
	// Expresión regular para detectar bloques de código con triple comillas invertidas
	const regexTripleQuotes = /```(\w+)[\s\S]+?```/g
	let matchesTripleQuotes = [...fullCode.matchAll(regexTripleQuotes)]

	// Si encontramos bloques de código con triple comillas invertidas
	if (matchesTripleQuotes.length > 0) {
		const codeBlock = matchesTripleQuotes[0][0]
		const codeType = matchesTripleQuotes[0][1].toLowerCase()

		// Eliminar las triple comillas invertidas del principio y del final
		const cleanedCodeBlock = codeBlock
			.replace(/```(\w+)/, '')
			.replace(/```$/, '')
			.trim()

		// Eliminar líneas que comienzan con "//"
		const cleanedCodeWithoutComments = cleanedCodeBlock
			.split('\n')
			.filter((line) => !line.trim().startsWith('//'))
			.join('\n')

		return [codeType, cleanedCodeWithoutComments]
	} else {
		// Si no se encuentra un bloque de código con triple comillas invertidas
		// Expresión regular para detectar bloques de código en líneas que comienzan con "//"
		const regexComments = /^\/\/.*$/gm
		const cleanedCodeWithoutComments = fullCode
			.replace(regexComments, '')
			.trim()

		return ['plaintext', cleanedCodeWithoutComments]
	}
}


module.exports = {
    calculateTaxesAndDiscounts,
    convertToNumber,
    mergeResults,
    removeDuplicatesFromArray,
    convertPDFToPNG,
    replaceNotFoundWithEmptyString,
    extractCIF,
    extractNIF,
    extractCodeBlocks
}