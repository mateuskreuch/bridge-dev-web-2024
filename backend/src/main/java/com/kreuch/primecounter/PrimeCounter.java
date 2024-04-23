package com.kreuch.primecounter;

import java.util.BitSet;

public class PrimeCounter {

    static int MAX_K = 100000000;

    static int pi(int k) {
        if (k <= 0) {
            throw new IndexOutOfBoundsException("Número menor ou igual à zero");
        }
        else if (k > MAX_K) {
            throw new IndexOutOfBoundsException("Número muito grande");
        }

        int count = k >= 2 ? 1 : 0;

        k++;

        int size = k / 2;
        var isComposite = new BitSet(size);

        // Half of a Sieve of Eratosthenes (skip even numbers)
        // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
        for (int i = 1; i <= Math.sqrt(k) / 2; i++) {
            if (!isComposite.get(i)) {
                markMultiples(isComposite, i);
            }
        }

        // Counting in a separate loop is faster because of JIT
        for (int i = 1; i < size; i++) {
            count += isComposite.get(i) ? 0 : 1;
        }

        return count;
    }

    private static void markMultiples(BitSet isComposite, int n) {
        for (int j = 2 * n * (n + 1); j < isComposite.size(); j += 2 * n + 1) {
            isComposite.set(j);
        }
    }

}
