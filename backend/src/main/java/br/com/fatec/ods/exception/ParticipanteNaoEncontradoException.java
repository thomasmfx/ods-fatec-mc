package br.com.fatec.ods.exception;

public class ParticipanteNaoEncontradoException extends RuntimeException {
    public ParticipanteNaoEncontradoException() {
        super("Nenhum participante encontrado com este e-mail.");
    }
}