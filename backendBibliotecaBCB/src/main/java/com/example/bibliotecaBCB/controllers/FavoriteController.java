package com.example.bibliotecaBCB.controllers;

import com.example.bibliotecaBCB.data.dto.BookDTO;
import com.example.bibliotecaBCB.data.entity.UserFavorites;
import com.example.bibliotecaBCB.data.service.FavoriteService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final JwtUtils jwtUtils;

    public FavoriteController(FavoriteService favoriteService, JwtUtils jwtUtils) {
        this.favoriteService = favoriteService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getall")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllFavorites(@RequestHeader(value="Authorization") String token){

        Long userId = jwtUtils.extractUserIdFromJWT(token);
        if(userId != null){
            List<UserFavorites> userFavoritesList = favoriteService.getAllFavoritesByUserId(userId);
            List<BookDTO> bookDTOS = new ArrayList<>();
            for(UserFavorites userFavorites: userFavoritesList){
                BookDTO bookDTO = new BookDTO(
                        userFavorites.getBook()
                );
                bookDTO.setFavorite(true);
                bookDTOS.add(bookDTO);
            }
            return ResponseEntity.ok(bookDTOS);
        }
        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addBookToFavorites(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId){

        Long userId = jwtUtils.extractUserIdFromJWT(token);
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

        Long userId = jwtUtils.extractUserIdFromJWT(token);

        if(userId != null){
            if(favoriteService.deleteFavorite(userId, bookId)) {
                return ResponseEntity.ok("Book successfully deleted from favorites!");
            }
        }
        return ResponseEntity.badRequest().build();
    }

}
