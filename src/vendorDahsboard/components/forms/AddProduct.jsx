import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
export const AddProduct = () => {
  const[productName,setProductName] = useState("");
  const[price,setPrice] = useState("");
  const[category,setCategory] = useState([]);
  const[bestSeller,setBestSeller] = useState(false);
  const[image,setFile] = useState(null);
  const[description,setDescription] = useState("");



  const handleCategoryChange = (event)=>{
  const value = event.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item)=> item !== value));
  }
  else{
    setCategory([...category,value])
  }
}


const handleBestSeller = (event) => setBestSeller(event.target.value === 'true');


const handleImageUpload =(event)=>{
  const selectedImage = event.target.files[0];
    setFile(selectedImage)
}
  const handleAddProduct = async(e)=>{


          e.preventDefault();
          try {
            
            const loginToken = localStorage.getItem('loginToken');
            const firmId = localStorage.getItem('firmId');
            

            if(!loginToken || !firmId){
                console.error("user not authenticated");

                            }

                            const formData = new FormData();
                            formData.append('productName',productName);
                            formData.append('price',price);
                            formData.append('description',description);
                            formData.append('image',image)
            


                            
          category.forEach((value)=>{
            formData.append('category',value);
          });

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
              method:'POST',
              body:formData
            })
              const data = await response.json()

            if(response.ok){
                          alert('Product added successfully');
                          setProductName('');
                          setPrice('');
                          setCategory([]);
                          setBestSeller(false);
                          setDescription('');
                          setFile(null);
}
else {
      alert(data.message || 'Failed to add product');
    }

          } catch (error) {
            console.log(error);
            alert('failed to add product')
          }
  }


  return (
   <div className="firmSection">
        
           <form className="tableForm" onSubmit={handleAddProduct}> 
            <h3>Add Product</h3>
            <label> Product Name</label>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}  />
            <label> Price</label>
            <input type="text"  value={price} onChange={(e)=>setPrice(e.target.value) }/>
   <label>Category</label>
     <div className="inputsContainer">
          <div className="checkboxContainer">
                  <label >veg</label>
                  <input type="checkbox"  value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
          </div>
           <div className="checkboxContainer">
                <label >non-Veg</label>
                <input type="checkbox"  value="non-veg"  checked={category.includes('non-veg')}  onChange={handleCategoryChange}/>
           </div>
     </div>
 <label>BestSeller</label>            
            <div className="inputsContainer">
                <div className="checkboxContainer">
                <label >Yes</label>
                <input type="radio"  value="true" checked={ bestSeller===true} onChange={handleBestSeller} />
              </div>
              <div className="checkboxContainer">
                <label >No</label>
                <input type="radio" value="false"  checked={bestSeller===false} onChange={handleBestSeller} />
            </div>
           </div>
            <label> Description</label>
            <input type="text"   value={description}  onChange={(e)=> setDescription(e.target.value)}/>
            <label> Firm Image</label>
            <input type="file"  onChange={handleImageUpload} />


             <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
    </form>
     </div>
  )
}
