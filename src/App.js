import {useState,useEffect} from "react";
import{format} from "date-fns"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [items,setItems] = useState([]);
  const [query,setQuery] = useState("programming")
  const [text,setText] = useState("");
  const [largeTitle,setlargeTitle] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    setIsLoading(true)
    const fetchArticles = async() => { 
    const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
    const data = await res.json();
    // this will give all 
    setItems(data.hits);
    // this will give first article
    setlargeTitle(data.hits[0]);
    }
    fetchArticles();
    setIsLoading(false)

  },[query]);

  const handleSubmit= (e)=>{
     e.preventDefault();

     if(!text){
      toast("Input is empty")
     }else{
       setQuery(text)
       setText("")
     }
  }


  return (
    <>
    <section className="section">
      <form autoCapitalize="off" onSubmit={handleSubmit}>
        <input
         type="text" 
          name="search" 
          value={text}
          id="search"
          onChange={(e)=> setText(e.target.value)} 
          placeholder="Search for something.." />
        <button>Search</button>
      </form>
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
       />
      
      {isLoading ? <div className="spinner"></div> : <>
      <article className="title">
        <h1>{largeTitle.title}</h1>
        <a href={largeTitle.url} target="_blank" rel="noreferrer">Read Full Article</a>
      </article>
      <p className="category">
        Category:<span>{query}</span>  
      </p>

      <article className="cards">
        {items.map(({author,created_at,title,url,objectId }) =>(
          <div key={objectId}>
            <h2>{title}</h2>
            <ul>
              <li>By {author}</li>
              <li><a href={url} target="_blank" rel="noreferrer">Read More</a></li>
            </ul>
            <p>
              {format(new Date(created_at),"dd MMMM yyyy")}
            </p>
          </div>
        ))}
      </article>
      </>}
    </section>
    </>

    );
}

export default App;
