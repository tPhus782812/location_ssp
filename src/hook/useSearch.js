import { useState } from "react";

export default function useSearch() {

    const [keyword, setKeyword] = useState("");

    const [result, setResult] = useState([]);

    return {

        keyword,

        setKeyword,

        result,

        setResult

    };

}