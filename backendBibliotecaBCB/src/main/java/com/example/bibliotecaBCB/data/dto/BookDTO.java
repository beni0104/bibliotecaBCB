package com.example.bibliotecaBCB.data.dto;

import lombok.Data;

@Data
public class BookDTO {
    private long bookId;
    private String title;
    private String author;
    private String category;
    private int amount;
}
