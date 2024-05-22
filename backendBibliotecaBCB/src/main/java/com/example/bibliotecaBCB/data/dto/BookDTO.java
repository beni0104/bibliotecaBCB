package com.example.bibliotecaBCB.data.dto;

import com.example.bibliotecaBCB.data.entity.Book;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BookDTO {
    private long id;
    private long bookId;
    private String title;
    private String author;
    private String category;
    private String photoUrl;
    private int amount;
    @JsonProperty("isFavorite")
    private boolean isFavorite;
    private Float rating;

    public BookDTO(Book book) {
        this.id = book.getId();
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.category = book.getCategory();
        this.photoUrl = book.getPhotoUrl();
        this.amount = book.getAmount();
        this.rating = book.getAverageRating();
    }
}
