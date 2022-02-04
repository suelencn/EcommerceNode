import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Category from "../../../../categories/infra/typeorm/entities/Category";

export default class Product{
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    nome: string;

    @Column("float", {scale: 10, precision: 2 })
    preco: number;

    @Column()
    quantidade: number;

    @Column()
    categoria_id: number;

    //Criando o relacionamento entre produto e categoria:

    //Muitos produtos podem ter a mesma categoria
    @ManyToOne(() => Category, (category) => category.produtos) //Entity Category, 
    @JoinColumn({ name: "categoria_id"})
    categoria: Category; //Representa a Categoria

    /* @OneToMany(() => OrderProduct, (order_product) => order_product.produto)
    pedido_produtos: OrderProduct[]; */

    @CreateDateColumn({ select: false })
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    


}