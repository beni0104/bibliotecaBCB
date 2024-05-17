package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT * FROM book WHERE category = :category ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Book> findRandomBooksByCategory(@Param("category") String category);
}
