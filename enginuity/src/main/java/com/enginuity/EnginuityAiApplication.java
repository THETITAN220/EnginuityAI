package com.enginuity;

import java.io.File;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import dev.langchain4j.data.document.Document;
import static dev.langchain4j.data.document.loader.FileSystemDocumentLoader.loadDocument;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class EnginuityAiApplication {

    private final EmbeddingStoreIngestor embeddingStoreIngestor;

    public EnginuityAiApplication(EmbeddingStoreIngestor embeddingStoreIngestor) {
        this.embeddingStoreIngestor = embeddingStoreIngestor;
    }

    @PostConstruct
    public void init() {
        // Load all PDFs in the 'resources/pdfs' folder
        try {
            File folder = new File(Objects.requireNonNull(getClass().getClassLoader().getResource("pdfs")).toURI());
            File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".pdf"));

            if (files != null) {
                for (File file : files) {
                    Path pdfPath = file.toPath();
                    Document document = loadDocument(pdfPath, new ApachePdfBoxDocumentParser());
                    embeddingStoreIngestor.ingest(document); // Process the document
                    System.out.println("Ingested: " + file.getName());
                }
            } else {
                System.out.println("No files found in the 'pdfs' directory.");
            }
        } catch (URISyntaxException e) {
            throw new RuntimeException("Error locating 'pdfs' folder in resources", e);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(EnginuityAiApplication.class, args);
    }
}
