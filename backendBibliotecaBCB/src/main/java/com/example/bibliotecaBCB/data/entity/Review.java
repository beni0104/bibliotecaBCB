package com.example.bibliotecaBCB.data.entity;


import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @SequenceGenerator(name = "reviewIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reviewIdGenerator")
    private long id;
    private double rating;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = true)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Review(ReviewDTO reviewDTO, User user, Book book) {
        this.rating = reviewDTO.getRating();
        this.description = reviewDTO.getDescription();
        this.book = book;
        this.user = user;
    }

    public Review(ReviewDTO reviewDTO, User user) {
        this.rating = reviewDTO.getRating();
        this.description = reviewDTO.getDescription();
        this.user = user;
    }
}
