package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.UserFavorites;
import com.example.bibliotecaBCB.data.repository.UserFavoritesRepository;
import com.example.bibliotecaBCB.data.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteService {

    private final UserRepository userRepository;
    private final BookService bookService;
    private final UserFavoritesRepository userFavoritesRepository;

    public FavoriteService(UserRepository userRepository, BookService bookService, UserFavoritesRepository userFavoritesRepository) {
        this.userRepository = userRepository;
        this.bookService = bookService;
        this.userFavoritesRepository = userFavoritesRepository;
    }

    public boolean addFavorite(Long userId, Long bookId) {
        if (!userFavoritesRepository.existsUserFavoritesByUserIdAndBookId(userId, bookId)) {
            if(!(userRepository.findById(userId).isPresent() && bookService.findById(bookId).isPresent()))
                return false;
            UserFavorites userFavorites = new UserFavorites(
                    userRepository.findById(userId).get(),
                    bookService.findById(bookId).get()
            );
            userFavoritesRepository.save(userFavorites);
            return true;
        }
        return false;
    }

    public boolean deleteFavorite(Long userId, Long bookId){
        if (userFavoritesRepository.existsUserFavoritesByUserIdAndBookId(userId, bookId)) {
            if(!(userRepository.findById(userId).isPresent() && bookService.findById(bookId).isPresent())){
                return false;
            }
            UserFavorites userFavorites = userFavoritesRepository.findByUserIdAndBookId(userId, bookId);
            userFavoritesRepository.delete(userFavorites);
            return true;
        }
        return false;
    }

    public Long getUserIdByUserEmail(String email){
        if(userRepository.findByEmail(email).isPresent())
            return userRepository.findByEmail(email).get().getId();
        else
            return null;
    }
}
