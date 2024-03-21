package com.example.bibliotecaBCB.controllers;

import com.example.bibliotecaBCB.data.ExcelHelper;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://LOCALHOST:4200/")
@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;
    private final ExcelHelper excelHelper;

    public BookController(BookService bookService) {
        this.bookService = bookService;
        excelHelper = new ExcelHelper(bookService);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/getpagedbooks")
    public ResponseEntity<List<Book>> getPagedBooks(@RequestParam(defaultValue = "0") int offset) {
        Page<Book> page = bookService.getPagedBooks(offset);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", String.valueOf(page.getTotalElements()));
        headers.add("Access-Control-Expose-Headers", "X-Total-Count");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<Book> findById(@RequestParam Long id){
        Optional<Book> book = bookService.findById(id);
        //        .orElseThrow(()-> new ResourceNotFoundException("Book does not exist with id: " +id));
        //   Exception handling
        if(book.isPresent())
            return ResponseEntity.ok(book.get());
        else
            return null;
    }

    @PostMapping("/create")
    //have to test if I can send one or more books with only this controller
    public ResponseEntity<List<Book>> saveBooks (@RequestBody List<Book> books){
        books.forEach(bookService::save);
        return ResponseEntity.ok(books);
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        bookService.deleteById(id);
        return ResponseEntity.ok("Successfully delete!");
    }
   // Tried to read data from Excel
    @GetMapping("/excel")
    public ResponseEntity<?> excel() throws IOException {
        List<Book> data = excelHelper.readExcel("C:\\Users\\szekr\\Downloads\\REGISTRU BIBLIOTECA BCB MARANATA.xlsx");
        return ResponseEntity.ok(data);
    }

}
