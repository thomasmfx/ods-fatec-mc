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

    // Método único e limpo, sem injeção de dependências antigas
    public byte[] gerarCertificadoPdf(String nomeParticipante) throws Exception {
        
        // 1. Carrega o template PDF estático da pasta resources
        InputStream templateStream = new ClassPathResource("/static/template_certificado.pdf").getInputStream();

        // 2. Usa o Loader correto do PDFBox 3.0+ com Java 21
        try (PDDocument document = Loader.loadPDF(templateStream.readAllBytes())) {
            
            // Pega a página 0 (sem escrever "pageIndex:")
            PDPage page = document.getPage(0);

            // 3. Abre a stream para escrever o nome
            // ... código anterior (carregamento do documento e da página) ...

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
            
            // Agora o PDFBox vai usar a versão que já é Negrito e Itálico nativamente!
            InputStream fontStream = new ClassPathResource("/static/PlayfairDisplay-BoldItalic.ttf").getInputStream();

            PDType0Font playfairBoldItalic = PDType0Font.load(document, fontStream);

            float fontSize = 24.0f;
            contentStream.setFont(playfairBoldItalic, fontSize);

            String texto = nomeParticipante.toUpperCase();

            // A matemática do centro continua funcionando perfeitamente com a nova fonte!
            // float pageWidth = page.getMediaBox().getWidth();
            // float textWidth = (playfairBoldItalic.getStringWidth(texto) / 1000.0f) * fontSize;
            float startX = 60;

            float startY = 320; // A altura perfeita que você encontrou

            contentStream.beginText();
            contentStream.newLineAtOffset(startX, startY);
            contentStream.showText(texto);
            contentStream.endText();
        }

        // ... continuação do código (salvar e retornar os bytes) ...

            // 4. Salva e retorna os bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}