package com.example.bibliotecaBCB.controllers;

import com.example.bibliotecaBCB.data.ExcelHelper;
import com.example.bibliotecaBCB.data.dto.BookDTO;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.service.BookService;
import com.example.bibliotecaBCB.data.service.FavoriteService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController

@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;
    private final ExcelHelper excelHelper;
    private final JwtUtils jwtUtils;
    private final FavoriteService favoriteService;

    public BookController(BookService bookService, JwtUtils jwtUtils, FavoriteService favoriteService) {
        this.bookService = bookService;
        excelHelper = new ExcelHelper(bookService);
        this.jwtUtils = jwtUtils;
        this.favoriteService = favoriteService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookDTO>> getAllBooks(@RequestHeader(value="Authorization") String token){
        if(token != null && token.startsWith("Bearer ") && token.split("\\.").length == 3) {
            Long userId = jwtUtils.extractUserIdFromJWT(token);
            if (userId != null) {
                List<Book> books = bookService.findAll();
                List<BookDTO> bookDTOS = new ArrayList<>();
                Set<Long> favoriteBookIds = favoriteService.getUserFavoritesBookIDs(userId);
                for (Book book : books) {
                    BookDTO bookDTO = new BookDTO(book);
                    if (favoriteBookIds.contains(bookDTO.getBookId()))
                        bookDTO.setFavorite(true);
                    bookDTOS.add(bookDTO);
                }
                return ResponseEntity.ok(bookDTOS);
            }
        }

        List<Book> books = bookService.findAll();
        List<BookDTO> bookDTOS = new ArrayList<>();
        for(Book book: books){
            BookDTO bookDTO = new BookDTO(book);
            bookDTOS.add(bookDTO);
        }
        return ResponseEntity.ok(bookDTOS);
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
    public ResponseEntity<BookDTO> findById(@RequestParam Long id){
        Optional<Book> book = bookService.findById(id);
        //        .orElseThrow(()-> new ResourceNotFoundException("Book does not exist with id: " +id));
        //   Exception handling
        if(book.isPresent())
            return ResponseEntity.ok(new BookDTO(book.get()));
        else
            return null;
    }

    @PostMapping("/createbooks")
    @PreAuthorize("hasRole('ADMIN')")
    //have to test if I can send one or more books with only this controller
    public ResponseEntity<List<Book>> saveBooks (@RequestBody List<Book> books){
        books.forEach(bookService::save);
        return ResponseEntity.ok(books);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    //have to test if I can send one or more books with only this controller
    public ResponseEntity<Book> saveBook (@RequestBody Book book){
        bookService.save(book);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBook (@RequestBody Book book){
        if(bookService.update(book))
            return ResponseEntity.ok(book);
        else
            return ResponseEntity.internalServerError().build();
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteById(@RequestBody List<Long> bookIds){
        bookService.deleteById(bookIds);
        return ResponseEntity.ok("Successfully delete!");
    }
   // Tried to read data from Excel
    @GetMapping("/excel")
    public ResponseEntity<?> excel() throws IOException {
        List<Book> data = excelHelper.readExcel("C:\\Users\\szekr\\Downloads\\REGISTRU BIBLIOTECA BCB MARANATA.xlsx");
        return ResponseEntity.ok(data);
    }

}
