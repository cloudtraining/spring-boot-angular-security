package com.devnexus2020.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenFilter extends OncePerRequestFilter {

    @Autowired
    SecurityUtils securityUtils;

    @Autowired
    RestSecurityProperties restSecProps;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if (!restSecProps.getAllowedpublicapis().contains(path)) {
            String idToken = securityUtils.getTokenFromRequest(request);
            FirebaseToken decodedToken = null;
            try {
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            } catch (FirebaseAuthException e) {
                logger.error("Firebase Exception:: ", e);
            }
            if (decodedToken != null) {
                User user = new User();
                user.setUid(decodedToken.getUid());
                user.setName(decodedToken.getName());
                user.setEmail(decodedToken.getEmail());
                user.setPicture(decodedToken.getPicture());
                user.setIssuer(decodedToken.getIssuer());
                user.setEmailVerified(decodedToken.isEmailVerified());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user, decodedToken, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }

}