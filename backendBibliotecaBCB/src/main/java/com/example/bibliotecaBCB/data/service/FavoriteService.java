package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.UserFavorites;
import com.example.bibliotecaBCB.data.repository.UserFavoritesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final BookService bookService;
    private final UserService userService;
    private final UserFavoritesRepository userFavoritesRepository;

    public FavoriteService(BookService bookService, UserService userService, UserFavoritesRepository userFavoritesRepository) {
        this.bookService = bookService;
        this.userService = userService;
        this.userFavoritesRepository = userFavoritesRepository;
    }

    public boolean addFavorite(Long userId, Long bookId) {
        if (!userFavoritesRepository.existsUserFavoritesByUserIdAndBookId(userId, bookId)) {
            if(!(userService.findById(userId).isPresent() && bookService.findById(bookId).isPresent())){
                return false;
            }
            UserFavorites userFavorites = new UserFavorites(
                    userService.findById(userId).get(),
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
            if(!(userService.findById(userId).isPresent() && bookService.findById(bookId).isPresent())){
                return false;
            }
            UserFavorites userFavorites = userFavoritesRepository.findByUserIdAndBookId(userId, bookId);
            userFavoritesRepository.delete(userFavorites);
            return true;
        }
        return false;
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
