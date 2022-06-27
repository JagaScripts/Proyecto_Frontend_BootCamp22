import { Editorial } from "../editorial/editorial.model";
import { Usuario } from "../usuario/usuario.model";

export interface Book {
   id: number;
   autor: string;
   titulo: string;
   isbn: string;
   edad: number;
   categoria: string;
   cantidad_veces_reservado: number;
   url_img: string;
   descripcion: string;
   disponible: string;
   usuario: Usuario;
   editorial: Editorial;

  // constructor(data?: any) {
  //   this.id = data?.id;
  //   this.autor = data?.autor;
  //   this.titulo = data?.titulo;
  //   this.isbn = data?.isbn;
  //   this.edad = data?.edad;
  //   this.categoria = data?.categoria;
  //   this.cantidad_veces_reservado = data?.cantidad_veces_reservado;
  //   this.url_img = data?.url_imagen;
  //   this.descripcion = data?.descripcion;
  //   this.disponible = data?.disponible;
  // }

  //   public resetAll(){
  //      id: null;
  //      autor: null;
  //      titulo: null;
  //      isbn: null;
  //      edad: null;
  //      categoria: null;
  //      cantidad_veces_reservado: null;
  //      url_img: null;
  //      descripcion: null;
  //      disponible: null;
  //   }


  //   public getId(): number {
  //       return this.id;
  //   }

  //   public setId(id: number): void {
  //       this.id = id;
  //   }

  //   public getAutor(): string {
  //       return this.autor;
  //   }

  //   public setAutor(autor: string): void {
  //       this.autor = autor;
  //   }

  //   public getTitulo(): string {
  //       return this.titulo;
  //   }

  //   public setTitulo(titulo: string): void {
  //       this.titulo = titulo;
  //   }

  //   public getIsbn(): string {
  //       return this.isbn;
  //   }

  //   public setIsbn(isbn: string): void {
  //       this.isbn = isbn;
  //   }

  //   public getEdad(): number {
  //       return this.edad;
  //   }

  //   public setEdad(edad: number): void {
  //       this.edad = edad;
  //   }

  //   public getCategoria(): string {
  //       return this.categoria;
  //   }

  //   public setCategoria(categoria: string): void {
  //       this.categoria = categoria;
  //   }

  //   public getCantidad_veces_reservado(): number {
  //       return this.cantidad_veces_reservado;
  //   }

  //   public setCantidad_veces_reservado(cantidad_veces_reservado: number): void {
  //       this.cantidad_veces_reservado = cantidad_veces_reservado;
  //   }

  //   public getUrl_img(): string {
  //       return this.url_img;
  //   }

  //   public setUrl_img(url_img: string): void {
  //       this.url_img = url_img;
  //   }

  //   public getDescripcion(): string {
  //       return this.descripcion;
  //   }

  //   public setDescripcion(descripcion: string): void {
  //       this.descripcion = descripcion;
  //   }

  //   public getDisponible(): string {
  //       return this.disponible;
  //   }

  //   public setDisponible(disponible: string): void {
  //       this.disponible = disponible;
  //   }



}
