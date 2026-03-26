package br.com.fatec.ods.exception;

public class EmailJaCadastradoException extends RuntimeException {
    public EmailJaCadastradoException(String mail) {
        super("E-mail já cadastrado: " + mail);
    }
}