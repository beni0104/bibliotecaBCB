package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.UserFavorites;
import com.example.bibliotecaBCB.data.repository.UserFavoritesRepository;
import com.example.bibliotecaBCB.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
            if(!(userRepository.findById(userId).isPresent() && bookService.findById(bookId).isPresent())){
                if(userRepository.findById(userId).isPresent())
                    System.out.println("user is present");
                if(bookService.findById(bookId).isPresent())
                    System.out.println("book is present");
                System.out.println("first in service");
                return false;
            }
            UserFavorites userFavorites = new UserFavorites(
                    userRepository.findById(userId).get(),
                    bookService.findById(bookId).get()
            );
            userFavoritesRepository.save(userFavorites);
            return true;
        }
        System.out.println("second in service");
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

    public List<UserFavorites> getAllFavoritesByUserId(Long userId){
        return userFavoritesRepository.findByUserId(userId);
    }

    public Set<Long> getUserFavoritesBookIDs(Long userId){
        List<UserFavorites> userFavoritesList = userFavoritesRepository.findByUserId(userId);
        return userFavoritesList.stream()
                .filter(userFavorite -> userFavorite.getBook() != null)
                .map(userFavorite -> userFavorite.getBook().getBookId())
                .collect(Collectors.toSet());

    }
}
