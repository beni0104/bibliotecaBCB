package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    public void save(Book book){
        bookRepository.save(book);
    }

    public void delete(Book book){
        bookRepository.delete(book);
    }

    public void update(Book book){
        bookRepository.save(book);
    }

    public Optional<Book> findById(Long id){
        return bookRepository.findById(id);
    }

}
