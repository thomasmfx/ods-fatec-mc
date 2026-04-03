package br.com.fatec.ods.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Service
public class CertificadoService {

    public byte[] gerarCertificadoPdf(String nomeParticipante) throws Exception {
        
        InputStream templateStream = new ClassPathResource("/static/template_certificado_04_04.pdf").getInputStream();

        try (PDDocument document = Loader.loadPDF(templateStream.readAllBytes())) {
            
            PDPage page = document.getPage(0);

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
            
            InputStream fontStream = new ClassPathResource("/static/PlayfairDisplay-BoldItalic.ttf").getInputStream();

            PDType0Font playfairBoldItalic = PDType0Font.load(document, fontStream);

            float fontSize = 24.0f;
            contentStream.setFont(playfairBoldItalic, fontSize);

            String texto = nomeParticipante.toUpperCase();

            float startX = 60;

            float startY = 320;
            contentStream.beginText();
            contentStream.newLineAtOffset(startX, startY);
            contentStream.showText(texto);
            contentStream.endText();
        }


            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}