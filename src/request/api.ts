// export interface SearchModelData{
//   //如果要进行分页，根据用户名搜索数据，可以把相应的变量封装在一起，不用一个一个变量去在vue界面定义，这里直接创建一个整合在一起的接口
//   currentPage: number
//   pageSize: number
//   userName: string
// }
import instance from "./request";

// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理
type Res<T> = Promise<ItypeAPI<null>>;
// 一般情况下响应数据返回的这三个参数，但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
    data: T,
    msg: string | null // 返回状态码的信息，如请求成功等
    code: number //返回后端自定义的200，404，500这种状态码
}

export const SearchInputApi = (params: { id: string }): Res<null> =>
instance.get(`/lookup?id=${params.id}`);  // 6466405648

export const RecommendApi = (params: { limitSize: number }): Res<null> =>
instance.get(`/rss/topgrossingapplications/limit=${params.limitSize}/json`);

export const AppListsApi = (params: { limitSize: number }): Res<null> =>
instance.get(`/rss/topfreeapplications/limit=${params.limitSize}/json`);

export const allDatasApi = (): Res<null> =>
instance.get(`/rss/topfreeapplications/limit=100/json`);

