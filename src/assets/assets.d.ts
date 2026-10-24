declare module "*.asset.json" {
  const asset: { url: string; asset_id?: string; content_type?: string };
  export default asset;
}
