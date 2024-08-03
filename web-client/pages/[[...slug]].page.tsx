import { useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Infer,
  array,
  boolean,
  mask,
  object,
  optional,
  string,
} from "superstruct";
import Default from "@/layouts/Default";
import { imageStruct, sanityData } from "@/lib/module/freeModule";
import { FreeModuleListFromServer } from "@/lib/module/freeModuleList";
import sanity, { sanityImage } from "@/lib/sanity";

import {
  customModulesType,
  unwrapCustomModules,
} from "@/lib/module/customModule";
import Head from "next/head";
import { imageDimensions } from "@/modules/Image/module";
import { CustomTagStruct } from "@/modules/CustomTag/module";
import CustomTag from "@/modules/CustomTag/CustomTag";
import valueOnError from "@/lib/valueOnError";
import { GlobalData, globalData } from "@/components/GlobalData/GlobalData";

const pagesQuery = `*[_type == "page"] { slug }`;

const response = array(
  object({
    slug: object({
      current: string(),
    }),
  }),
);

type PageResponse = {
  slug: string | string[];
};

export const getStaticPaths: GetStaticPaths<PageResponse> = async () => {
  const pages = await valueOnError(
    async () => mask(await sanity.fetch(pagesQuery), response),
    () => [],
  )();

  return {
    paths: [...pages.map((page) => page.slug.current)],
    fallback: true,
  };
};

const customModulesQuery = `*[_type == "customModule"]`;

const globalMetaQuery = `*[_type == "globalPageMeta"][0]`;

const singlePageQuery = `*[_type == "page" && slug.current == $slug][0] {
  ...,
  "modules": modules[]{
    _type == 'reference' => @->{
      ...,
      "_key": ^._key
    },
    _type != 'reference' => @,
  },
}`;

const pageMeta = {
  description: optional(string()),
  ogDescription: optional(string()),
  ogTitle: optional(string()),
  ogImage: optional(imageStruct),
  isGoogleAnalyticsEnabled: optional(boolean()),
  googleanalyticsId: optional(string()),
  googleSiteVerificationId: optional(string()),
  custom: optional(
    array(
      object({
        name: string(),
        value: string(),
      }),
    ),
  ),
  customTag: optional(array(CustomTagStruct)),
  ...globalData,
};

const pageType = object({
  _id: string(),
  title: string(),
  modules: array(sanityData),
  slug: object({
    current: string(),
  }),
  ...pageMeta,
});

const pageMetaStruct = object(pageMeta);

type PageType = Infer<typeof pageType>;
type MetaType = Infer<typeof pageMetaStruct>;

// 1 minute
const revalidate = 60;

export const getStaticProps: GetStaticProps<{
  page: PageType | string;
  meta: MetaType;
}> = async (context) => {
  const params = context.params as PageResponse;

  let slug =
    (typeof params.slug === "string"
      ? params.slug
      : (params.slug || ["/"]).join("/")) || "/";

  if (slug[0] !== "/") {
    slug = `/${slug}`;
  }

  const metaFetch = sanity.fetch(globalMetaQuery);

  const [pageFromServer, customModulesFromServer, globalMeta] =
    await Promise.all([
      sanity.fetch(singlePageQuery, { slug }),
      sanity.fetch(customModulesQuery),
      metaFetch,
    ]);

  try {
    const customModulesRaw = mask(customModulesFromServer, customModulesType);
    const customModules = unwrapCustomModules(
      customModulesRaw,
      customModulesRaw,
    );

    const page = unwrapCustomModules(
      mask(pageFromServer, pageType),
      customModules,
    );

    const meta = mask(globalMeta, pageMetaStruct);
    return { props: { page, meta }, revalidate };
  } catch (error) {
    console.error("FATAL ERROR, SHOW 404 FOR", slug, error);

    return { notFound: true, revalidate };
  }
};

function Dynamic(props: { modules: PageType["modules"] }) {
  const Modules = useMemo(
    () => FreeModuleListFromServer(props.modules),
    [props.modules],
  );

  return <Modules.Render></Modules.Render>;
}

function useImageFromSanity(image: Infer<typeof imageStruct> | undefined) {
  return useMemo(() => {
    const output = image && sanityImage(image.asset);

    if (!output) return undefined;

    const url = output.url();
    const { width, height } = imageDimensions(url);

    return {
      url: output.url(),
      width,
      height,
    };
  }, [image]);
}

export default function Page(props: {
  page: PageType | string | undefined;
  meta: MetaType | undefined;
}) {
  const ogImage = useImageFromSanity(
    (typeof props.page === "object" ? props.page.ogImage : undefined) ||
      props.meta?.ogImage,
  );

  return (
    <Default>
      {typeof props.page === "object" && (
        <Head>
          <title>{props.page.title}</title>
          <meta
            name="description"
            content={props.page.description || props.meta?.description}
          />
          <meta
            property="og:site_name"
            content={process.env.NEXT_PUBLIC_CANONICAL_ROOT_URL}
          />
          <meta
            property="og:url"
            content={`${process.env.NEXT_PUBLIC_CANONICAL_ROOT_URL}${
              props.page.slug.current === "/" ? "" : props.page.slug.current
            }`}
          />
          <meta property="og:type" content="website" />
          {props.page.title && (
            <meta property="og:title" content={props.page.title} />
          )}
          {props.page.title && (
            <meta property="twitter:title" content={props.page.title} />
          )}
          {ogImage && <meta property="og:image" content={ogImage.url} />}
          {ogImage && <meta property="og:image:url" content={ogImage.url} />}
          {ogImage && (
            <meta property="og:image:secure_url" content={ogImage.url} />
          )}
          {ogImage && <meta property="twitter:image" content={ogImage.url} />}
          {ogImage && (
            <meta property="og:image:width" content={ogImage.width} />
          )}
          {ogImage && (
            <meta property="og:image:height" content={ogImage.height} />
          )}
          {ogImage && <meta property="og:image:type" content="image/jpeg" />}
          {(props.page.description ||
            props.page.ogDescription ||
            props.meta?.description ||
            props.meta?.ogDescription) && (
            <meta
              property="og:description"
              content={
                props.page.description ||
                props.page.ogDescription ||
                props.meta?.description ||
                props.meta?.ogDescription
              }
            />
          )}
          {(props.page.ogDescription || props.meta?.ogDescription) && (
            <meta
              property="twitter:description"
              content={props.page.ogDescription || props.meta?.ogDescription}
            />
          )}

          {props.meta?.customTag?.map((custom, index) => (
            <CustomTag tag={custom} key={index}>
              {custom.children && <Dynamic modules={custom.children}></Dynamic>}
            </CustomTag>
          ))}

          {props.page.customTag?.map((custom, index) => (
            <CustomTag tag={custom} key={index}>
              {custom.children && <Dynamic modules={custom.children}></Dynamic>}
            </CustomTag>
          ))}

          {props.page.custom?.map((custom) => (
            <meta key={custom.name} name={custom.name} content={custom.value} />
          ))}
        </Head>
      )}
      <GlobalData value={props.meta}>
        {typeof props.page !== "object" ? (
          <>Loading...</>
        ) : (
          <Dynamic modules={props.page.modules}></Dynamic>
        )}
      </GlobalData>
    </Default>
  );
}
