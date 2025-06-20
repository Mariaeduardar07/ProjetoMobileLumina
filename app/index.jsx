import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import Banner from "../components/banner/Banner.js";
import CategoriesCards from "../components/categoriesCards/CategoriesCards.js";
import SearchBar from "../components/search/Search.js";
import { useRouter } from "expo-router";
import Newsletter from "../components/newsletter/Newsletter.js";
import Forms from "../components/forms/Forms.js";
import BlogObjectives from "../components/blogObjectives/BlogObjectives.js";
import NoResults from "../components/noResults/NoResults.js";

const { width } = Dimensions.get("window");



export default function Home() {
  const router = useRouter();

  // Lista de páginas pesquisáveis com palavras-chave detalhadas
  const searchablePages = [
    {
      title: "Cuidados Capilares",
      keywords: [
        "cabelo", "capilar", "cuidados capilares", "liso", "lisos", "cabelo liso", "cabelos lisos", "reto", "sem ondas",
        "cacheado", "cacheados", "cabelo cacheado", "cabelos cacheados", "ondulado", "ondas",
        "crespo", "crespos", "cabelo crespo", "cabelos crespos", "afro", "volumoso"
      ],
      render: () => (
        <CategoriesCards
          categories={[
            {
              title: "Cuidados Capilares",
              description: "Dicas e produtos para manter seus cabelos lindos e saudáveis",
              route: "categoria/cuidadosCapilares",
              image: {
                uri: "https://img.freepik.com/fotos-premium/garrafa-de-oleo-para-restaurar-e-recuperar-cabelos-danificados-cachos-de-cabelo-e-oleo-de-cabelo-vista-superior_132254-2492.jpg?w=360",
              },
            },
          ]}
          onCategoryPress={handleCategoryPress}
        />
      ),
    },
    {
      title: "Maquiagens",
      keywords: [
        "maquiagem", "maquiagens", "make", "pele", "base", "corretivo", "blush", "contorno", "iluminador", "maquiagem pele",
        "olhos", "sombra", "delineador", "rímel", "rimel", "mascara", "maquiagem olhos", "lápis de olho", "lapis de olho",
        "lábios", "labios", "batom", "gloss", "maquiagem boca", "batom líquido", "batom liquido", "lip tint"
      ],
      render: () => (
        <CategoriesCards
          categories={[
            {
              title: "Maquiagens",
              description: "Dicas práticas para realçar sua beleza com maquiagem.",
              route: "/categoria/maquiagens",
              image: {
                uri: "https://panoramafarmaceutico.com.br/wp-content/uploads/2022/08/Venda-de-cosmeticos-importados-supera-patamar-pre-pandemia.jpg",
              },
            },
          ]}
          onCategoryPress={handleCategoryPress}
        />
      ),
    },
    {
      title: "Skincare",
      keywords: [
        "skincare", "pele", "cuidados com a pele", "seca", "secas", "pele seca", "peles secas", "ressecada", "descamação", "descamacao",
        "mista", "mistas", "pele mista", "peles mistas", "zona t", "oleosidade", "seca e oleosa",
        "oleosa", "oleosas", "pele oleosa", "peles oleosas", "brilho", "poros", "cravos", "espinhas"
      ],
      render: () => (
        <CategoriesCards
          categories={[
            {
              title: "Skincare",
              description: "Cuidados essenciais para uma pele bonita e bem tratada",
              route: "/categoria/skincare",
              image: {
                uri: "https://prismaengenhariajr.com.br/wp-content/uploads/imagens-blog-24.png",
              },
            },
          ]}
          onCategoryPress={handleCategoryPress}
        />
      ),
    },
    {
      title: "Contatos",
      keywords: ["contato", "contatos", "fale conosco"],
      render: () => <Forms />,
    },
    {
      title: "Newsletter",
      keywords: ["newsletter", "novidades", "email"],
      render: () => <Newsletter />,
    },
    {
      title: "Objetivos do Blog",
      keywords: ["objetivo", "objetivos", "sobre", "blog"],
      render: () => <ObjetivosBlog />,
    },
    {
      title: "Quiz",
      keywords: ["formulario", "formulário", "feedback", "sugestão", "quiz"],
      render: () => <Forms />,
    },
  ];

  // Estado para controlar o que mostrar
  const [searchResult, setSearchResult] = useState(null);

  function handleCategoryPress(route) {
    router.push(route);
  }

  // Função para remover acentos e deixar minúsculo
  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  // Pesquisa e mostra o componente correspondente
  const handleSearch = (query) => {
    if (!query) {
      setSearchResult(null);
      return;
    }
    const lower = normalize(query);
    const found = searchablePages.find(
      page =>
        normalize(page.title).includes(lower) ||
        (page.keywords && page.keywords.some(k => normalize(k).includes(lower) || lower.includes(normalize(k))))
    );
    setSearchResult(found ? found.render() : <NoResults />);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Banner
        title="Seja bem vinda ao blog Lumina"
        text="acenda o que há de mais bonito em você!"
        image={{
          uri: "data:image/jpeg;base64,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",
        }}
        gradientColors={[
           "rgb(141, 185, 209)","rgba(167,213,236,0.8)",
        ]}
      />
      {searchResult === null && (
        <>
          <CategoriesCards
            categories={[
              {
                title: "Cuidados Capilares",
                description: "Dicas e produtos para manter seus cabelos lindos e saudáveis",
                route: "categoria/cuidadosCapilares",
                image: {
                  uri: "https://img.freepik.com/fotos-premium/garrafa-de-oleo-para-restaurar-e-recuperar-cabelos-danificados-cachos-de-cabelo-e-oleo-de-cabelo-vista-superior_132254-2492.jpg?w=360",
                },
              },
              {
                title: "Maquiagens",
                description: "Dicas práticas para realçar sua beleza com maquiagem.",
                route: "/categoria/maquiagens",
                image: {
                  uri: "https://panoramafarmaceutico.com.br/wp-content/uploads/2022/08/Venda-de-cosmeticos-importados-supera-patamar-pre-pandemia.jpg",
                },
              },
              {
                title: "Skincare",
                description: "Cuidados essenciais para uma pele bonita e bem tratada",
                route: "/categoria/skincare",
                image: {
                  uri: "https://prismaengenhariajr.com.br/wp-content/uploads/imagens-blog-24.png",
                },
              },
            ]}
            onCategoryPress={handleCategoryPress}
          />
          <BlogObjectives />
          <Newsletter />
          <Forms />
        </>
      )}
      {searchResult !== null && searchResult}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
});