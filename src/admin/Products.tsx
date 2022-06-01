import React, {useEffect, useState} from 'react';
import Wrappers from './Wrappers';
import {Product} from "./interface/product";
import {Link} from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/products');

                const data = await response.json();

                setProducts(data);
            }
        )();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure want to delete this product?')) {
            await fetch(`http://localhost:8000/api/products/${id}`, {method: 'DELETE'});

        }
        setProducts(products.filter((p: Product) => p.id !== id));
    };
    return (
        <Wrappers>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">likes</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td><img src={p.image} height='180'/></td>
                                    <td>{p.likes}</td>
                                    <td>
                                        <Link to={`/admin/products/${p.id}/edit`}
                                              className="btn btn-sm btn-outline-secondary">edits</Link>

                                        <div className="bth-group-mr-2">
                                            <a href="#" className='btn btn-outline-secondary'
                                               onClick={() => del(p.id)}>Delete</a>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </Wrappers>
    );
};


export default Products;