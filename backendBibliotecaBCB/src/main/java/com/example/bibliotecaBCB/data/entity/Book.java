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
    @SequenceGenerator(name = "carteIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carteIdGenerator")
    private long id;
    private long bookId;
    private String title;
    private String author;
    private String category;
    private int amount;



}
