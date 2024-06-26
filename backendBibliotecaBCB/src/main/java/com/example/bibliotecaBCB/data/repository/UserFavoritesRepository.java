package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.UserFavorites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserFavoritesRepository extends JpaRepository<UserFavorites, Long> {

    boolean existsUserFavoritesByUserIdAndBookId(Long userId, Long bookId);

    UserFavorites findByUserIdAndBookId(Long userId, Long bookId);

    List<UserFavorites> findByUserId(Long userid);
}
