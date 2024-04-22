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
    static int MAX_K = 100000000;

    @GetMapping("/pi/{k}")
    ResponseEntity<PrimeCountResponse> pi(@PathVariable int k) {
        if (k <= 0) {
            throw new IndexOutOfBoundsException("Número menor ou igual à zero");
        }
        else if (k > MAX_K) {
            throw new IndexOutOfBoundsException("Número muito grande");
        }

        long startingTime = System.nanoTime();

        // Start with 2 already counted if K > 1
        int count = k > 1 ? 1 : 0;

        // Include K itself because Java uses [0, K)
        k++;

        // BitSet is more memory efficient than boolean[]
        BitSet isComposite = new BitSet(k / 2);

        // Half of a Sieve of Eratosthenes (skip even numbers)
        // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
        for (int i = 1; i <= Math.sqrt(k) / 2; i++) {
            if (!isComposite.get(i)) {
                // If prime, mark all its multiples as composite
                for (int j = 2 * i * (i + 1); j < k / 2; j += 2 * i + 1) {
                    isComposite.set(j);
                }
            }
        }

        // It's faster to count primes in another loop because of JIT
        for (int i = 1; i < k / 2; i++) {
            count += isComposite.get(i) ? 0 : 1;
        }

        // Convert ns to ms and format
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
