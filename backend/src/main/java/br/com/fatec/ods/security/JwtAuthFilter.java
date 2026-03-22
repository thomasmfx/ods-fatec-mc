package br.com.fatec.ods.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Se não tem header ou não começa com "Bearer ", deixa passar
        // (rotas públicas não enviam token — o Spring Security vai barrar se necessário)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // remove "Bearer "

        try {
            // Valida a assinatura e extrai o participanteId
            Integer participanteId = jwtService.extrairParticipanteId(token);

            // Guarda o id no atributo da requisição para uso nos controllers
            request.setAttribute("participanteId", participanteId);

            filterChain.doFilter(request, response); // libera para o próximo filtro/controller

        } catch (JwtException e) {
            // Token inválido, expirado ou adulterado — rejeita com 401
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("""
                {"erro":"nao_autorizado","mensagem":"Token de sessão inválido ou expirado."}
            """);
        }
    }
}