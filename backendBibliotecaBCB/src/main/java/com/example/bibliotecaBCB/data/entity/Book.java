package com.example.bibliotecaBCB.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    public Book(long bookId, String title, String author, String category, int amount) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.amount = amount;
    }
}
