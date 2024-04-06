package com.example.bibliotecaBCB.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @SequenceGenerator(name = "bookIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookIdGenerator")
    private long id;
    private long bookId;
    private String title;
    private String author;
    private String category;
    private int amount;

    @JsonIgnoreProperties
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserFavorites> userFavorites;

    @JsonIgnoreProperties
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    public Book(long bookId, String title, String author, String category, int amount) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.amount = amount;
    }
}
