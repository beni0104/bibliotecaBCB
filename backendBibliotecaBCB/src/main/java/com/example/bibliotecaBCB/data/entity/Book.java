package com.example.bibliotecaBCB.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.annotation.Nullable;
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
    private Long id;
    private Long bookId;
    private String title;
    private String author;
    private String category;
    private String photoUrl;
    private int amount;
    private Float averageRating;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserFavorites> userFavorites;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Loan> loans;

    public Book(Long bookId, String title, String author, String category, int amount, Float averageRating, String photoUrl) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.photoUrl = photoUrl;
        this.amount = amount;
        this.averageRating = averageRating;
    }
}
