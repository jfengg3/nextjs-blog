import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { IconContext } from "react-icons";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      <IconContext.Provider value={{ size: "2em"}}>
        <div className="icon-wrapper">
          <Link href="https://github.com/jfengg3"><a className="icon"><FaGithub /></a></Link>
          <Link href="https://www.linkedin.com/in/jfengg/"><a className="icon"><FaLinkedin /></a></Link>
          <Link href="https://www.hackerrank.com/jfengg3/"><a className="icon"><FaHackerrank /></a></Link>
        </div>
      </IconContext.Provider>

      <section className={utilStyles.headingMd}> 
        <p>Hi! I am Year 1 Computing Science student from SIT-UoG</p>
        <p>
          I love dabbing on new technologies, am currently interested in full-stack development{' '}
          with React & Node
        </p>
      </section>

      {/* Blog post */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}