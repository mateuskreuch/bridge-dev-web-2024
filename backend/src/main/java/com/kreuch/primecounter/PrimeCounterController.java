package com.kreuch.primecounter;

import java.util.BitSet;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.kreuch.primecounter.DTO.PrimeCountResponse;

@RestController
@CrossOrigin(origins = "*")
public class PrimeCounterController {

    @GetMapping("/pi/{k}")
    ResponseEntity<PrimeCountResponse> pi(@PathVariable int k) {
        long startingTime = System.nanoTime();
        int count = PrimeCounter.pi(k);
        double dt = (System.nanoTime() - startingTime) / 1_000_000.0;

        String ms = String.format(Locale.US, "%.3f ms", dt);

        return ResponseEntity.ok().body(new PrimeCountResponse(count, ms));
    }

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<Object> handleIndexOutOfBoundsException(IndexOutOfBoundsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        return new ResponseEntity<>("Entrada não reconhecida", HttpStatus.BAD_REQUEST);
    }

}
