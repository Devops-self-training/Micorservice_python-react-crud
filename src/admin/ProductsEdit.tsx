import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import Wrappers from "./Wrappers";
import {Navigate} from 'react-router-dom';
import {Product} from "./interface/product";
import {useParams} from 'react-router-dom';

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        (
            async () => {

                const response = await fetch(`http://localhost:8000/api/products/${id}`);

                const product: Product = await response.json();

                setTitle(product.title);
                setImage(product.image)
            }
        )();
    }, []);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'Put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        });
        setRedirect(true);
    }
    if (redirect) {
        // React V6 have using new syntax
        /**
         * Read this link: https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md#upgrade-to-react-router-v6
         * With key-word: "Redirect"
         **/
        return <Navigate to={'/admin/products'}/>;
    }

    return (
        <Wrappers>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" defaultValue={title}  name="title"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" defaultValue={image} name="image"
                           onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrappers>
    );
};

export default ProductsEdit;