package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.service.FavoriteService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final JwtUtils jwtUtils;

    public FavoriteController(FavoriteService favoriteService, JwtUtils jwtUtils) {
        this.favoriteService = favoriteService;
        this.jwtUtils = jwtUtils;
    }

    private Long extractUserIdFromJWT(String token){
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        return favoriteService.getUserIdByUserEmail(username);
    }

    @PatchMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addBookToFavorites(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId){

        Long userId = extractUserIdFromJWT(token);

        if(userId != null){
            if(favoriteService.addFavorite(userId, bookId)){
                return ResponseEntity.ok("Book successfully added to favorites!");
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @Transactional
    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteBookFromFavorites(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId){

        Long userId = extractUserIdFromJWT(token);
        
        if(userId != null){
            if(favoriteService.deleteFavorite(userId, bookId)) {
                return ResponseEntity.ok("Book successfully deleted from favorites!");
            }
        }
        return ResponseEntity.badRequest().build();
    }

}
