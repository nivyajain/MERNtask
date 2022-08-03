// import React from "react";
// import { Formik, Form, Field } from "formik";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import * as Yup from "yup";
// import { Card } from "../UI/Card";
// const AddCatSchema = Yup.object().shape({
//   CategoryName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   ParentID: Yup.string(),
// });

// export const AddCategory = () => {
//   const [category, setCategory] = useState([]);
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/categories").then((res) => {
//       setCategory(res.data);
//     }, []);
//   });
//   const addCat=()=>{
//     axios.post("http://localhost:3000/api/categories"),{
//       CategoryName: "",
//               ParentID: "",
//      }
//   }

//   return (
//     <div>
//       <Card>
//         <h3>ADD CATEGORY</h3>
//         <Formik
//           initialValues={{
//             CategoryName: "",
//             ParentID: "",
//           }}
//           validationSchema={AddCatSchema}
//           onSubmit={(values) => {
//             console.log(values);
//           }}
//         >
//           {({ errors, touched }) => (
//             <Form>
//               <label>CategoryName:</label>
//               <Field name="CategoryName" />
//               {errors.CategoryName && touched.CategoryName ? (
//                 <div>{errors.CategoryName}</div>
//               ) : null}
//               <br />
//               <label>ParentID:</label>

//               <Field name="ParentID" />
//               {errors.ParentID && touched.ParentID ? (
//                 <div>{errors.ParentID}</div>
//               ) : null}
//               <br />
//               <button type="submit">ADD</button>
//             </Form>
//           )}
//         </Formik>
//       </Card>
//     </div>
//   );
// };
