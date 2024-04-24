package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
}
