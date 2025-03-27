package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT * FROM book WHERE category = :category ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Book> findRandomBooksByCategory(@Param("category") String category);

    @Query("SELECT b FROM Book b " +
            "WHERE FUNCTION('unaccent', LOWER(b.title)) LIKE FUNCTION('unaccent', LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "OR FUNCTION('unaccent', LOWER(b.author)) LIKE FUNCTION('unaccent', LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Book> searchBooks(@Param("searchTerm") String searchTerm);
}
