package br.com.fatec.ods.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarCertificado(String destinatario, String nomeParticipante, byte[] pdfAnexo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // "true" permite que o e-mail tenha anexos
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject("Seu Certificado - 1ª Conferência Nacional ODS");
            
            String corpo = String.format(
                "Olá, %s!\n\nAgradecemos a sua participação na 1ª Conferência Nacional ODS.\n\n" +
                "Segue em anexo o seu certificado de participação.\n\n" +
                "Atenciosamente,\nEquipe ODS Fatec",
                nomeParticipante.split("")[0]
            );
            
            helper.setText(corpo);
            
            // Anexa o PDF
            helper.addAttachment("Certificado_Conferencia_ODS.pdf", new ByteArrayResource(pdfAnexo));

            mailSender.send(message);
            System.out.println("E-mail enviado com sucesso para: " + destinatario);

        } catch (MessagingException e) {
            System.err.println("Erro ao enviar e-mail para " + destinatario);
            e.printStackTrace();
        }
    }
}