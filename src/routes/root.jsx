import { Link,NavLink, Outlet,useLoaderData,Form, redirect,useNavigation } from "react-router-dom";
import {getContacts,createContact} from "../contact"

export async function action() {
  const contact = await createContact();
  // console.log(contact)
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader({request}){
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts= await getContacts(q)
  return {contacts,q}
}
  

export default function Root() {
    const {contacts,q}= useLoaderData()
    const navigation= useNavigation()
    console.log(contacts)
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
            <button type="submit">New</button>
          </Form>

          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  
                  {/* <Link to={`contacts/${contact.id}`}>
                     
                    </Link> */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                   {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>

                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"  className={
          navigation.state === "loading" ? "loading" : ""
        }>
       
            <Outlet/>
        </div>
      </>
    );
  }
