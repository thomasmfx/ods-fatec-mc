package br.com.fatec.ods.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            // Desabilita CSRF — desnecessário para APIs stateless com JWT
            .csrf(csrf -> csrf.disable())

            // Stateless: o Spring não vai criar/usar sessão HTTP
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                // Rotas públicas — não precisam de token
                .requestMatchers(
                    "/sessao/checkin",
                    "/sessao/cadastro",
                    "/sessao/opcoes",
                    "/eixos",
                    "/dashboard",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/votacao"
                ).permitAll()

                // Tudo mais exige token válido
                .anyRequest().authenticated()
            )

            // Registra nosso filtro ANTES do filtro padrão de autenticação do Spring
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}