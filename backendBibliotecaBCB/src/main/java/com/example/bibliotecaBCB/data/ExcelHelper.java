package com.example.bibliotecaBCB.data;

import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.service.BookService;
import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Stream;

public class ExcelHelper {

    private final BookService bookService;
    public ExcelHelper(BookService bookService) {
        this.bookService = bookService;
    }

    public List<Book> readExcel(String fileLocation) throws IOException {
        List<Book> data = new ArrayList<>();

        try (FileInputStream file = new FileInputStream(fileLocation); ReadableWorkbook wb = new ReadableWorkbook(file)) {
            Optional<Sheet> optionalSheet = wb.getSheet(3);
            if(optionalSheet.isEmpty())
                return data;

            Sheet sheet = optionalSheet.get();
            try (Stream<Row> rows = sheet.openStream()) {
                rows.forEach(r -> {
                    Book book = new Book();
                    if(r.getCellAsNumber(3).isPresent())
                        book.setBookId(r.getCellAsNumber(3).get().longValue());
                    else
                        book.setBookId(-1);
                    book.setAuthor(r.getCellAsString(2).orElse(null));
                    book.setTitle(r.getCellAsString(1).orElse(null));
                    book.setCategory(r.getCellAsString(0).orElse(null));
                    book.setAmount(1);

                    bookService.save(book);

                    data.add(book);
                });
            }
        }

        return data;
    }
}
