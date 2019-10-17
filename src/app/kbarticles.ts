export class Kbarticle{
 public constructor(
    public articleId:number,
    public articleName: string,
    public content: string,
    public previewContent: string,
    public categoryId: number,
    public categoryName: string,
    public createdBy: number,
    public createdByName: string,
    public createdDate: string,
    public modifiedBy: number,
    public modifiedByName: string,
    public modifiedDate: string
  ){}
}
